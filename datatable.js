(function(){

  new Vue({
  el: '#master-container',
  created: function(){
    this.currentFullArray = data;
    this.dataTableArrays = _.chunk(this.currentFullArray, 10);
    this.dataProperties = this.getKeys(this.currentFullArray[0]);
    this.dataProperties.shift();
    this.currentSearchCategory = this.dataProperties[0];
  },
  data: {
    currentFullArray: [],      
    dataTableArrays: [],
    dataProperties: [],
    currentActiveIndex: 0,
    currentSort:'Name',
    currentSortDir:'asc',
    searchChars: '',
    currentSearchCategory: ''        
  },
  methods: {
    getKeys: function(obj){
      var keys = [];
      for(var key in obj){
          keys.push(key);
      }
      return keys;
    },
    removeNumbersFromGeginning: function(address){
      return address.substr(address.indexOf(" ") + 1)
    },    
    restoreArray: function(){
      this.currentFullArray = data;
      this.dataTableArrays = _.chunk(this.currentFullArray, 10);  
      this.filterArrayBySearch(); 
    },
    filterArrayBySearch: function(){
      var that = this;
      this.currentFullArray = data.filter(function(item){
        return item[that.currentSearchCategory].toLowerCase().includes(that.searchChars.toLowerCase());
      });
      this.dataTableArrays = _.chunk(this.currentFullArray, 10);
      this.currentActiveIndex = 0; 
    },
    activatePage: function(index){
      this.currentActiveIndex = index;
    },
    moveOnePage: function(action){
      if(action === 'forward'){
        this.currentActiveIndex++
      } else {
        this.currentActiveIndex--
      }
    },
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
      this.dataTableArrays = _.chunk(this.sortedArray, 10);
    }
  },
  computed: {
    sortedArray:function() {
      var that = this;
      return this.currentFullArray.sort((a,b) => {
        let modifier = 1;
        if(that.currentSortDir === 'desc') modifier = -1;
        if(that.currentSort === 'Address'){
          if(this.removeNumbersFromGeginning(a[that.currentSort]) < this.removeNumbersFromGeginning(b[that.currentSort])) {
            return -1 * modifier
          }
          if(this.removeNumbersFromGeginning(a[that.currentSort]) > this.removeNumbersFromGeginning(b[that.currentSort])) {
            return 1 * modifier        
          }
        } else {
          if(a[that.currentSort] < b[that.currentSort]) {
            return -1 * modifier
          }
          if(a[that.currentSort] > b[that.currentSort]) {
            return 1 * modifier        
          }
        }
        return 0;
      });
    }    
  }
})


}());


