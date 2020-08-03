<template>
  <div class="sidebar">
    <div class="sidebar__toolbar" :class="{ centered: !this.notes.length }">
      <h2 v-if="!notes.length">Welcome! Add your first note...</h2>
      <SearchIcon v-if="notes.length" @click="focusSearch" class="feather" />
      <FilePlusIcon @click="addNote" class="feather" />
      <div v-if="notes.length" class="sidebar__search">
        <input type="search"
               ref="searchbar"
               placeholder="Search notes..."
               @input="searchNotes($event.target.value)">
      </div>
    </div>
    <div v-if="favoriteNotesList.length" class="favorites">
      <details open>
        <summary><strong>Favorites</strong></summary>
        <div class="note"
           v-for="note in favoriteNotesList"
           :class="{ selected: note === selectedNote }"
           @click="selectNote(note)"
           :key="note.id">
        {{ note.title }}
      </div>
      </details>
    </div>
    <div v-if="!searchResults.length" class="notes">
      <div class="note"
           v-for="note in notes"
           :key="note.id"
           :class="{ selected: note === selectedNote }"
           @click="selectNote(note)">
         {{ note.title }}
      </div>
    </div>
    <div v-else>
      <div class="results">
        <div v-for="result in searchResults"
             :key="result.item.id"
             :class="{ selected: result.item === selectedNote }"
             @click="selectNote(result.item)">
          {{ result.item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FilePlusIcon, SearchIcon } from 'vue-feather-icons'

export default {
  name: 'Sidebar',
  components: {
    FilePlusIcon,
    SearchIcon
  },
  props: {
    notes: Array,
    selectedNote: Object
  },
  data () {
    return {
      searchResults: [],
      searching: false
    }
  },
  methods: {
    addNote () {
      this.$emit('add-note')
    },
    selectNote (note) {
      this.$emit('select-note', note)
      this.clearSearch()
    },
    focusSearch () {
      this.searching = true
      const searchbar = this.$refs.searchbar
      searchbar.focus()
    },
    clearSearch () {
      this.$refs.searchbar.value = ''
      this.searchResults = []
    },
    searchNotes (term) {
      // search with vue-fuse
      const options = {
        includeScore: true,
        keys: ['title', 'content']
      }

      this.$search(term, this.notes, options)
        // .then(results => console.log(results))
        .then(results => {
          this.searchResults = results
        })
    }
  },
  computed: {
    favoriteNotesList () {
      return this.notes.filter(note => note.favorite === true)
    }
  }
  // directives: {
  //   focus: {
  //     inserted (el) {
  //       el.focus()
  //     }
  //   }
  // }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.sidebar__toolbar {
  margin-bottom: 1rem;
}

.sidebar__search {
  height: 2rem;
  width: 100%;
  border-bottom: 1px solid #ddd;
}

.note {
  transition: background-color 200ms ease-in-out;
}

.note:hover {
  background-color: #efefef;
}

.selected {
  background-color: #efefef;
}

.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.favorites {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #efefef;
}

.feather {
  padding-left: 0;
}
</style>
