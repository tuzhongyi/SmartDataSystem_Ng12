export interface Config {
  playback: { begin: number; end: number; seek: number };
  videoUrl: string;
  regionId: string;
  help: string;
}

export interface MqttConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}
