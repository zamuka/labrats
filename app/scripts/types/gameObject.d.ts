type GameObject = {
  position: Point;
  objectType: keyof typeof ItemType;
  details?: any;
}