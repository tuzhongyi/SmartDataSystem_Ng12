class CameraUrl {
  constructor(private base: string) {}
  basic() {
    return `${this.base}/Cameras`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }
  excels() {
    return `${this.basic()}/Excels`;
  }
  files(id: string) {
    return `${this.item(id)}/Files`;
  }
  trashcan(id: string) {
    return new TrashCanUrl(this.item(id));
  }
}
