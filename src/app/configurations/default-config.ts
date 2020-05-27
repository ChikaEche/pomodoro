export interface DefaultConfiguration {
  sessionTime: number;
  breakTime: number;
  longBreakInterval: number;
  autoplay: boolean;
  additionalBreakTime: number;
}

const Configuration: DefaultConfiguration = {
  sessionTime: 60,
  breakTime: 5,
  longBreakInterval: 4,
  autoplay: true,
  additionalBreakTime: 20,
};

export default Configuration;
