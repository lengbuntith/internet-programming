export class KhmerDate {
  oldDate: Date = new Date();
  date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  millisToMinutes(millis: number) {
    let minutes: number = Math.floor(millis / 60000);
    return minutes;
  }

  NumSeconds(millis: number) {
    let seconds: number = 60 * this.millisToMinutes(millis);
    return seconds;
  }

  NumHour(millis: number) {
    let hour: number = this.millisToMinutes(millis) / 60;
    return hour;
  }

  NumDay(millis: number) {
    let day: number = this.NumHour(millis) / 24;
    return day;
  }

  NumWeek(millis: number) {
    let week: number = this.NumDay(millis) / 7;
    return week;
  }

  NumMonth(millis: number) {
    let month: number = this.NumWeek(millis) / 4;
    return month;
  }

  getDate() {
    let date_str: string = this.date.toString();
    let old_date_str: string = this.oldDate.toString();

    let date_num: number = Date.parse(date_str);
    let old_date_num: number = Date.parse(old_date_str);

    const diffTime: number = old_date_num - date_num;
    const diffMinute: number = this.millisToMinutes(diffTime);

    let result = "";

    if (diffMinute < 1) {
      result = "មុននេះបន្តិច";
    } else if (diffMinute >= 1 && diffMinute < 60) {
      result = diffMinute + " នាទីមុន";
    } else if (diffMinute >= 60 && diffMinute < 60 * 24) {
      result = this.NumHour(diffTime).toFixed(0) + " ម៉ោងមុន";
    } else if (diffMinute >= 60 * 24 && diffMinute < 60 * 24 * 7) {
      result = Math.ceil(this.NumDay(diffTime)) + " ថ្ងៃមុន";
    } else if (diffMinute >= 60 * 24 * 7 && diffMinute < 60 * 24 * 31) {
      result = Math.ceil(this.NumWeek(diffTime)) + " សប្តាហ៍មុន";
    } else if (diffMinute >= 60 * 24 * 31) {
      result = Math.ceil(this.NumMonth(diffTime)) + " ខែមុន";
    }

    result = result.replaceAll("0", "០");
    result = result.replaceAll("1", "១");
    result = result.replaceAll("2", "២");
    result = result.replaceAll("3", "៣");
    result = result.replaceAll("4", "៤");
    result = result.replaceAll("5", "៥");
    result = result.replaceAll("6", "៦");
    result = result.replaceAll("7", "៧");
    result = result.replaceAll("8", "៨");
    result = result.replaceAll("9", "៩");

    return result;
  }
}
