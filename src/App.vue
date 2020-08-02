<template>
  <div id="app">
    <Navbar @unselect-note="unselectNote"/>

    <div class="main">
      <Sidebar
        id="sidebar"
        :notes="notes"
        :selectedNote="selectedNote"
        :class="{ hidden: isHidden }"
        @add-note="addNote"
        @select-note="selectNote($event)" />

      <MarkdownEditor
        v-if="selectedNote"
        id="editor"
        :editing="editing"
        :selectedNote="selectedNote"
        @update-content="updateContent($event)"
        @delete-note="deleteNote($event)"
        @preview-note="previewNote" />

      <MarkdownPreview
        v-if="selectedNote"
        id="preview"
        :selectedNote="selectedNote"
        :notePreview="notePreview"
        :editing="editing"
        @edit-note="editNote" />
    </div>
  </div>
</template>

<script>
import marked from 'marked'

import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import MarkdownPreview from './components/MarkdownPreview.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    MarkdownEditor,
    MarkdownPreview
  },
  data () {
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedNoteId: localStorage.getItem('selected-id') || null,
      adding: true,
      editing: false
    }
  },
  methods: {
    updateContent (value) {
      this.content = value
    },
    addNote () {
      this.editing = true
      const time = Date.now()
      const note = {
        id: time,
        title: `Note ${this.notes.length + 1}`,
        content: 'Some sample **Markdown**',
        created: time,
        favorite: false
      }
      this.notes.push(note)
      this.selectedNoteId = note.id
    },
    selectNote (note) {
      this.selectedNoteId = note.id
    },
    unselectNote () {
      this.selectedNoteId = null
    },
    previewNote () {
      this.editing = false
    },
    editNote () {
      this.editing = true
    },
    deleteNote () {
      const index = this.notes.indexOf(this.selectedNote)
      if (index !== -1) {
        this.notes.splice(index, 1)
      }
    },
    saveNotes () {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
  },
  computed: {
    notePreview () {
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },
    selectedNote () {
      return this.notes.find(note => note.id === this.selectedNoteId)
    },
    isHidden () {
      return Boolean(this.selectedNote)
    }
  },
  watch: {
    notes: {
      handler: 'saveNotes',
      deep: true
    },
    selectedNoteId (value) {
      localStorage.setItem('selected-id', value)
    }
  }
}
</script>

<style>
@import './assets/css/reset.css';
@import './assets/css/global.css';
@import './assets/css/icons.css';

:root {
  --color-green: #42b883;
  --color-dark: #35495e;
}

#app {
  display: flex;
  flex-direction: column;
  /* height: calc(100vh - 3rem); */
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #35495e;
}

.main {
  display: flex;
  flex: 1;
}

#sidebar {
  flex: 20%;
  border-right: 1px solid #efefef;
}

#editor,
#preview {
  flex: 80%;
}

@media (max-width: 960px) {
  #sidebar.hidden {
    display: none;
  }
}
</style>
