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
  }
  initGrid(){
    for (var row = 0; row < this.max_row; row++) {
      for (var col = 0; col < this.max_col; col++) {
        $(".calendar-dates-panel").append("<div data-row="+row+" data-col="+col+" class=\"calendar-dates\"></div>");
        this.grid[row][col] = 1;
      }
    }
    this.initializeValue();
  }

  initializeValue(){
    var today = new Date();
    var vals = new Date(today.setDate(today.getDate()-(today.getDate()-1)));
    console.log(vals.getDate());
    for (var row = 0; row < this.max_row; row++) {
      for (var col = 0; col < this.max_col; col++) {
        $("div[data-row="+row+"][data-col="+col+"]").html();
      }
    }
  }

}
