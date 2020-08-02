<template>
  <div v-if="!editing" class="preview">
    <div class="toolbar">
      <h3>{{ selectedNote.title }}</h3>
      <div class="button-group">
        <ShareIcon class="feather" />
        <EditIcon class="feather" @click="editNote" />
      </div>
    </div>
    <div v-html="notePreview" class="preview-pane"></div>
  </div>
</template>

<script>
import { EditIcon, ShareIcon } from 'vue-feather-icons'

export default {
  name: 'MarkdownPreview',
  components: {
    ShareIcon,
    EditIcon
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
</style>
