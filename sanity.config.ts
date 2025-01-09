import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'last',

  projectId: '1kifk5u3',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types:schemaTypes,
  },
})
