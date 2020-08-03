<template>
  <div v-if="!editing" class="preview">
    <div class="toolbar">
      <h3>{{ selectedNote.title }}</h3>
      <div class="button-group">
        <DownloadIcon class="feather" @click="downloadFile" />
        <StarIcon class="feather"
                  @click="favoriteNote"
                  :class="{ fillIcon: this.selectedNote.favorite }"/>
        <EditIcon class="feather" @click="editNote" />
      </div>
    </div>
    <div v-html="notePreview" class="preview-pane"></div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import { EditIcon, DownloadIcon, StarIcon } from 'vue-feather-icons'

export default {
  name: 'MarkdownPreview',
  components: {
    EditIcon,
    DownloadIcon,
    StarIcon
  },
  props: {
    notePreview: String,
    selectedNote: Object,
    editing: Boolean
  },
  data () {
    return {}
  },
  methods: {
    editNote () {
      this.$emit('edit-note')
    },
    favoriteNote () {
      this.selectedNote.favorite = !this.selectedNote.favorite
    },
    downloadFile () {
      const filename = `${this.selectedNote.title.toLowerCase().replace(' ', '-')}.txt`
      const content = this.selectedNote.content
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, filename)
    }
  }
}
</script>

<style scoped>
.preview {
  display: flex;
  flex-direction: column;
}

.toolbar {
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #efefef;
  padding: 0 1rem;
}

.preview-pane {
  padding: .2rem 1rem;
  flex: 1;
}

.fillIcon {
  fill: rgb(134, 140, 144);
}
</style>
