<template>
  <div class="app-container">
    <treeChart :json="personTree" :class="{landscape: landscape.length}" @click-node="clickNode" />
  </div>
</template>

<script>
import treeChart from './components/treeChart'
import { getTree } from '@/api/person'

export default {
  name: '',
  components: {
    treeChart
  },
  queryParam: {},
  data() {
    return {
      landscape: [],
      personTree: {},
      queryParam: {},
      data: {
        name: 'root',
        image_url: 'https://static.refined-x.com/static/avatar.jpg',
        class: ['rootNode'],
        children: [
          {
            name: 'children1',
            image_url: 'https://static.refined-x.com/static/avatar.jpg'
          },
          {
            name: 'children2',
            image_url: 'https://static.refined-x.com/static/avatar.jpg',
            mate: [
              {
                name: 'mate',
                image_url: 'https://static.refined-x.com/static/avatar.jpg'
              }
            ],
            children: [
              {
                name: 'grandchild',
                image_url: 'https://static.refined-x.com/static/avatar.jpg'
              },
              {
                name: 'grandchild2',
                image_url: 'https://static.refined-x.com/static/avatar.jpg'
              },
              {
                name: 'grandchild3',
                image_url: 'https://static.refined-x.com/static/avatar.jpg'
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    clickNode: function(node) {
    },
    getTree() {
      getTree(this.queryParam).then(res => {
        res.data.class = ['rootNode']
        this.personTree = res.data
      })
    }
  }
}
</script>

<style>
.avat{border-radius: 2em;border-width:2px;}
.name{font-weight:700;}

.foot {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #333;
    padding: 24px;
    overflow: hidden;
    color: #999;
    font-size: 14px;
    text-align: center;
}
.foot a{color:#fff;margin:0 .5em}
</style>
