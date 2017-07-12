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
    this.initValue();
  }
  initGrid(){
    $(".calendar-dates").remove(); //remove duplicated divs
    for (var row = 0; row < this.max_row; row++) {
      for (var col = 0; col < this.grid[row].length; col++) {
        $(".calendar-dates-panel").append("<div data-row="+row+" data-col="+col+" class=\"calendar-dates\"></div>");
      }
    }
  }

  initValue(){
    var today = new Date();
    var dummy = new Date(today.setDate(today.getDate()-(today.getDate()-1))); //set it to first date of the month
    this.mainCalculation(dummy);
    this.plotGrid();
  }

  refresh(year, month_index){
    var day = new Date(year, month_index);
    var dummy = new Date(day.setDate(day.getDate()-(day.getDate()-1))); //set it to first date of the month
    this.clearGridValue(); //clear the grid value before processing to next grid
    this.initGrid(); //re-initialize the grid
    this.mainCalculation(dummy);
    this.plotGrid();
  }

  mainCalculation(dummy){
    var dummy_first_day = dummy.getDay();
    var dummy_month = dummy.getMonth();
    this.grid[0][dummy_first_day] = dummy.getDate();
    this.fillInNullBeforeFirstDay(dummy); //fills in null first before the first date
    this.fillInDatesInMonth(dummy); //fills in the rest
    this.fillInPrevMonthDates(dummy); //convert the first nulls to previous month dates
    this.fillInNextMonthDates(); //convert the last nulls to next month dates
  }

  fillInDatesInMonth(dummy){
    var day = new Date(dummy);
    var current_month = day.getMonth();
    for (var row = 0; row < this.max_row; row++) {
      for (var col = 0; col < this.grid[row].length; col++) {
        //skips all the null days and day 1
        if (this.grid[row][col] === null || this.grid[row][col] == day.getDate()) {
          continue;
        }else{
          day.setDate(day.getDate()+1);
          if (day.getMonth() != current_month) {
            this.grid[row][col] = null;
          }else{
            this.grid[row][col] = day.getDate();
          }
        }
      }
    }
  }

  fillInNextMonthDates(row,col){
    var increment = 1;
    for (var row = 0; row < this.grid.length; row++) {
      for (var col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] == null) {
          this.grid[row][col] = increment;
          $("div[data-row="+row+"][data-col="+col+"]").addClass("after");
          increment++;
        }
      }
    }
  }


  fillInPrevMonthDates(dummy){
    var dummy = new Date(dummy);
    var prev_month = dummy.getMonth();
    var current_year = dummy.getFullYear();
    var dummy_first_day = dummy.getDay();
    var day = new Date(current_year, prev_month, -1); //use -1 so it starts from the last day of previous month
    var decrement = 0;
    for (var i = dummy_first_day-1; i >= 0 ; i--) {
      $("div[data-row=0][data-col="+i+"]").addClass("before");
      if (i == dummy_first_day-1) { //first element
        this.grid[0][i] = day.getDate()+1;
      }else{
        this.grid[0][i] = day.getDate()-decrement;
        decrement++;
      }
    }
  }

  fillInNullBeforeFirstDay(dummy){
    var dummy = new Date(dummy);
    var dummy_first_day = dummy.getDay();
    for (var i = dummy_first_day-1; i >= 0; i--) {
      this.grid[0][i] = null;
    }
  }

  /////////////////////////////////////
  plotGrid(){
    for (var row = 0; row < this.max_row; row++) {
      for (var col = 0; col < this.grid[row].length; col++) {
        $("div[data-row="+row+"][data-col="+col+"]").html(this.grid[row][col]);
      }
    }
  }

  clearGridValue(){
    this.grid = new Array(this.max_row);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.max_col);
    }
  }

}
