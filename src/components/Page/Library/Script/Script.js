import React from "react";

class Script extends React.Component {
  static displayName = "Script";

  static scriptObservers = {};

  static loadedScripts = {};

  static erroredScripts = {};

  static idCount = 0;

  scriptLoaderId = `id${this.constructor["idCount"]++}`;

  componentDidMount() {
    console.log("1");

    const { onError, onLoad, src } = this.props;

    if (this.constructor.loadedScripts[src]) {
      if (onLoad) onLoad();
      return;
    }

    if (this.constructor.erroredScripts[src]) {
      if (onError) onError();
      return;
    }

    if (this.constructor.scriptObservers[src]) {
      this.constructor.scriptObservers[src][this.scriptLoaderId] = this.props;
      return;
    }

    this.constructor.scriptObservers[src] = {
      [this.scriptLoaderId]: this.props,
    };

    this.createScript();
  }

  createScript() {
    console.log("creacte");

    const { onCreate, src, attributes } = this.props;
    const script = document.createElement("script");

    if (onCreate) {
      onCreate();
    }

    if (attributes) {
      Object.keys(attributes).forEach((prop) =>
        script.setAttribute(prop, attributes[prop])
      );
    }

    script.src = src;

    if (!script.hasAttribute("async")) {
      script.async = true;
    }

    const callObserverFuncAndRemoveObserver = (shouldRemoveObserver) => {
      const observers = this.constructor.scriptObservers[src];
      Object.keys(observers).forEach((key) => {
        if (shouldRemoveObserver(observers[key])) {
          delete observers[this.scriptLoaderId];
        }
      });
    };

    script.onload = () => {
      console.log("load");

      this.constructor.loadedScripts[src] = true;
      callObserverFuncAndRemoveObserver((observer) => {
        if (observer.onLoad) observer.onLoad();
        return true;
      });
    };

    script.onerror = () => {
      this.constructor.erroredScripts[src] = true;
      callObserverFuncAndRemoveObserver((observer) => {
        if (observer.onError) observer.onError();
        return true;
      });
    };

    document.body.appendChild(script);
    console.log("append");
  }

  componentWillUnmount() {
    console.log("unmount");

    const { src } = this.props;
    const observers = this.constructor.scriptObservers[src];

    if (observers) {
      delete observers[this.scriptLoaderId];
    }
  }

  render() {
    console.log("render");

    return null;
  }
}

export default Script;
