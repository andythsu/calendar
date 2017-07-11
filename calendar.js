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
  }

  nextMonth(){
    var self = this;
    var current_month = self.dom['cur_month'].html();
    var index = self.months.indexOf(current_month);
    if (index < 0) {
      console.log("error: index not in array");
    }else{
      if (index == 11) {
        self.dom['cur_month'].html(self.months[0]);
        var cur_year = self.dom['cur_year'].html();
        self.dom['cur_year'].html(parseInt(cur_year)+1);
      }else{
        self.dom['cur_month'].html(self.months[index+1]);
      }
    }
  }

  previousMonth(){
    var self = this;
    var current_month = self.dom['cur_month'].html();
    var index = self.months.indexOf(current_month);
    if (index < 0) {
      console.log("error: index not in array");
    }else{
      if (index == 0) {
        self.dom['cur_month'].html(self.months[11]);
        var cur_year = self.dom['cur_year'].html();
        self.dom['cur_year'].html(parseInt(cur_year)-1);
      }else{
        self.dom['cur_month'].html(self.months[index-1]);
      }
    }
  }

  plotDates(){
    for (var row = 0; row < ROW_MAX; row++) {
      for (var col = 0; col < COL_MAX; col++) {
        $().html();
      }
    }
  }

}
