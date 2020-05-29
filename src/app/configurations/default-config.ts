export interface DefaultConfiguration {
  sessionTime: number;
  breakTime: number;
  longBreakInterval: number;
  autoplay: boolean;
  additionalBreakTime: number;
}

const Configuration: DefaultConfiguration = {
  sessionTime: 1500,
  breakTime: 600,
  longBreakInterval: 4,
  autoplay: true,
  additionalBreakTime: 300,
};

export default Configuration;
