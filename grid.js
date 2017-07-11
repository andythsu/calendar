class Grid{
  constructor(max_row, max_col){
    this.max_row = max_row;
    this.max_col = max_col;
    /* initialize 2D grid */
    this.grid = new Array(this.max_row);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.max_col);
    }
    /* end */
    this.initGrid();
  }
  initGrid(){
    for (var row = 0; row < this.max_row; row++) {
      for (var col = 0; col < this.grid[row].length; col++) {
        $(".calendar-dates-panel").append("<div data-row="+row+" data-col="+col+" class=\"calendar-dates\"></div>");
      }
    }
    this.initValue();
  }

  initValue(){
    var today = new Date();
    var dummy = new Date(today.setDate(today.getDate()-(today.getDate()-1))); //set it to first date of the month
    var dummy_first_day = dummy.getDay();
    var dummy_month = dummy.getMonth();
    this.grid[0][dummy_first_day] = dummy.getDate();
    this.fillInDaysBeforeFirstDay(dummy_first_day);

    this.refreshGridValues(dummy);
    this.plotGrid();
  }

  refresh(year, month_index){
    this.clearGrid();
    var day = new Date(year, month_index);
    var dummy = new Date(day.setDate(day.getDate()-(day.getDate()-1))); //set it to first date of the month
    var dummy_first_day = dummy.getDay();
    var dummy_month = dummy.getMonth();
    this.grid[0][dummy_first_day] = dummy.getDate();
    this.fillInDaysBeforeFirstDay(dummy_first_day);

    this.refreshGridValues(dummy);
    this.plotGrid();
  }



  refreshGridValues(dummy){
    var dummy_month = dummy.getMonth();
    for (var row = 0; row < this.max_row; row++) {
      for (var col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] === null || this.grid[row][col] == dummy.getDate()) {
          continue;
        }else{
          dummy.setDate(dummy.getDate()+1);
          if (dummy.getMonth() != dummy_month) {
            this.grid[row][col] = null;
          }else{
            this.grid[row][col] = dummy.getDate();
          }
        }
      }
    }
  }

  plotGrid(){
    for (var row = 0; row < this.max_row; row++) {
      for (var col = 0; col < this.grid[row].length; col++) {
        $("div[data-row="+row+"][data-col="+col+"]").html(this.grid[row][col]);
      }
    }
  }

  clearGrid(){
    this.grid = new Array(this.max_row);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.max_col);
    }
  }

  fillInDaysBeforeFirstDay(dummy_first_day){
    for (var i = 0; i < dummy_first_day; i++) {
      this.grid[0][i] = null;
    }
  }

  fillInDaysAfterLastDay(dummy_last_day){
    for (var i = dummy_last_day+1; i <= this.max_col; i++) {
      this.grid[this.max_row][i] = null;
    }
  }

}
