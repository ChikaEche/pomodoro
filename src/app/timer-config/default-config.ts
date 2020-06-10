export interface Configuration {
  sessionTime: number;
  breakTime: number;
  longBreakInterval: number;
  autoplay: boolean;
  additionalBreakTime: number;
}

const defaultConfiguration: Configuration = {
  sessionTime: 1500,
  breakTime: 600,
  longBreakInterval: 4,
  autoplay: true,
  additionalBreakTime: 300,
};

export default defaultConfiguration;
