class Stopwatch extends React.Component {
  constructor(display) {
    super(display);

    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${this.pad0(this.times.minutes)}:${this.pad0(this.times.seconds)}:${this.pad0(Math.floor(this.times.miliseconds))}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  get() {
    let time = this.format();
    var span = document.createElement('div');
    span.innerHTML = time;
    document.getElementsByClassName('results')[0].appendChild(span);

    this.reset();
    this.print();
  }

  pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }

  render() {
    let time = this.format();
    return React.createElement(
      'div',
      null,
      React.createElement(
        'nav',
        { className: 'controls' },
        React.createElement(
          'button',
          {
            className: 'button',
            id: 'start',

            onClick: () => this.start()
          },
          'Start'
        ),
        React.createElement(
          'button',
          {
            className: 'button',
            id: 'stop',
            value: 'Stop',
            onClick: () => this.stop()
          },
          'Stop'
        )
      ),
      React.createElement(
        'div',
        { className: 'stopwatch' },
        time
      ),
      React.createElement(
        'ul',
        { className: 'results' },
        React.createElement(
          'button',
          {
            className: 'button',
            id: 'get',

            onClick: () => this.get()
          },
          'Get'
        )
      )
    );
  }
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('content'));

// const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
//
// let startButton = document.getElementById('start');
// startButton.addEventListener('click', () => stopwatch.start());
//
// let stopButton = document.getElementById('stop');
// stopButton.addEventListener('click', () => stopwatch.stop());
//
// let getButton = document.getElementById('get');
// getButton.addEventListener('click', () => stopwatch.get());
