class Calendar{
  constructor(today){
    this.today = today;
    this.months = ["Jan","Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    this.today_month = this.today.getMonth();
    this.today_year = this.today.getFullYear();
    this.today_date = this.today.getDate()+1;
    this.dom = {
      "cur_year" : $(".cur_year"),
      "cur_month" : $(".cur_month"),
      "calendar_dates" : $(".calendar-dates")
    };
    this.ROW_MAX = 6;
    this.COL_MAX = 7;
    this.grid = new Grid(this.ROW_MAX, this.COL_MAX);
  }

  nextMonth(){
    var self = this;
    var current_month = self.dom['cur_month'].html();
    var index = self.months.indexOf(current_month);
    var new_month, new_month_index;
    var cur_year = self.dom['cur_year'].html();
    cur_year = parseInt(cur_year);
    if (index < 0) {
      console.log("error: index not in array");
    }else{
      if (index == 11) {
        new_month_index = 0;
        new_month = self.months[new_month_index];
        self.dom['cur_month'].html(new_month);
        cur_year = cur_year + 1;
        self.dom['cur_year'].html(cur_year);
      }else{
        new_month_index = index+1;
        new_month = self.months[new_month_index];
        self.dom['cur_month'].html(new_month);
      }
    }
    this.grid.refresh(cur_year, new_month_index);
  }

  previousMonth(){
    var self = this;
    var new_month, new_month_index;
    var current_month = self.dom['cur_month'].html();
    var index = self.months.indexOf(current_month);
    var cur_year = self.dom['cur_year'].html();
    cur_year = parseInt(cur_year);
    if (index < 0) {
      console.log("error: index not in array");
    }else{
      if (index == 0) {
        new_month_index = 11;
        new_month = self.months[new_month_index];
        cur_year = cur_year-1;
        self.dom['cur_month'].html(new_month);
        self.dom['cur_year'].html(cur_year);
      }else{
        new_month_index = index-1;
        new_month = self.months[new_month_index];
        self.dom['cur_month'].html(new_month);
      }
    }
    this.grid.refresh(cur_year, new_month_index);
  }

}
