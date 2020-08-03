<template>
  <div v-if="editing" class="editor">
    <div class="toolbar">
      <div class="toolbar__left">
        <label>
          <input id="note-title" type="text" v-model="selectedNote.title">
        </label>
      </div>
      <div class="toolbar__right">
        <Trash2Icon class="feather" @click="deleteNote" />
        <EyeIcon class="feather" @click="previewNote" />
      </div>
    </div>
    <textarea class="content" v-model="selectedNote.content"></textarea>
    <div class="statusbar">
      <span class="date">
        <span class="label">Created</span>
        <span class="value">{{ selectedNote.created | date }}</span>
      </span>
      <span class="line-count">
        <span class="label">Lines</span>
        <span class="value">{{ linesCount }}</span>
      </span>
      <span class="word-count">
        <span class="label">Words</span>
        <span class="value">{{ wordsCount }}</span>
      </span>
      <span class="character-count">
        <span class="label">Characters</span>
        <span class="value">{{ charsCount }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { EyeIcon, Trash2Icon } from 'vue-feather-icons'

export default {
  name: 'MarkdownEditor',
  components: {
    EyeIcon,
    Trash2Icon
  },
  props: {
    selectedNote: Object,
    editing: Boolean
  },
  data () {
    return {
      content: localStorage.getItem('content') || 'This is **Markdown** content'
    }
  },
  methods: {
    previewNote () {
      this.$emit('preview-note')
    },
    deleteNote () {
      if (this.selectedNote && confirm('Delete the note?')) {
        this.$emit('delete-note')
      }
    },
    emitContent () {
      this.$emit('update-content', this.content)
    }
  },
  computed: {
    linesCount () {
      return this.selectedNote.content.split(/\r\n|\r|\n/).length
    },
    wordsCount () {
      let content = this.selectedNote.content
      content = content.replace(/\n/g, ' ')
      content = content.replace(/^(\s*)|(\s*$)/gi, '')
      content = content.replace(/\s\s+/gi, ' ')
      return content.split(' ').length
    },
    charsCount () {
      return this.selectedNote.content.split('').length
    }
  },
  filters: {
    date (time) {
      return dayjs(time).format('DD.MM.YYYY, HH:mm')
    }
  },
  watch: {
    content: 'emitContent'
  },
  created () {
    this.emitContent()
  }
}
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
}

.toolbar {
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #efefef;
}

.toolbar__left {
  flex: 1;
}

label {
  border-bottom: 1px solid #ccc;
  margin-right: 1rem;
}

input#note-title {
  font-family: inherit;
  font-size: 1rem;
  width: 60%;
}

textarea.content {
  flex: 1;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  padding: 1rem;
}

.statusbar {
  display: flex;
  font-size: .9rem;
  padding: 0 1rem;
}

.statusbar .value {
  opacity: .7;
  font-weight: bolder;
}

.date .label,
.line-count .label,
.word-count .label,
.character-count .label {
  opacity: .6;
}

.line-count .label,
.word-count .label,
.character-count .label {
  margin-left: 1rem;
}

.statusbar .value {
  margin-left: .25rem;
}

@media (max-width: 520px) {
  .statusbar {
    flex-direction: column;
  }

  .line-count .label,
  .word-count .label,
  .character-count .label {
    margin-left: 0;
  }
}
</style>
