<template>
  <div class="sidebar">
    <div class="sidebar__toolbar" :class="{ centered: !this.notes.length }">
      <h2 v-if="!notes.length">Welcome! Add your first note...</h2>
      <SearchIcon @click="focusSearch" class="feather" />
      <FilePlusIcon @click="addNote" class="feather" />
      <div class="sidebar__search">
        <input type="search"
               ref="searchbar"
               @blur="searching = !searching"
               @input="searchNotes($event.target.value)">
      </div>
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
    },
    focusSearch () {
      this.searching = !this.searching
      const searchbar = this.$refs.searchbar
      searchbar.focus()
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
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }
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

.feather {
  padding-left: 0;
}
</style>
