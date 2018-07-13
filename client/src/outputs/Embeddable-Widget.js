import React from 'react';
import ReactDOM from 'react-dom';
import Widget from '../components/Widget.jsx';

class EmbeddableWidget extends React.Component {
  //static property
  static el;

  //es7 static method 
  static mount() {
    const component = <Widget />;

    function doRender() {
      if (EmbeddableWidget.el) {
        throw new Error('EmbeddableWidget is already mounted, unmount first');
      }
      const el = document.createElement('div');
      el.setAttribute('class', 'knowhow-widget');
      document.body.appendChild(el);
      ReactDOM.render(
        component,
        el,
      );
      EmbeddableWidget.el = el;
    }

    //check if load event is about to fire.
    if (document.readyState === 'complete') {
      doRender();
    } else {
      window.addEventListener('load', () => {
        doRender();
      });
    }
  }

 // static method to unmount widget
  static unmount() {
    if (!EmbeddableWidget.el) {
      throw new Error('EmbeddableWidget is not mounted, mount first');
    }
    ReactDOM.unmountComponentAtNode(EmbeddableWidget.el);
    EmbeddableWidget.el.parentNode.removeChild(EmbeddableWidget.el);
    EmbeddableWidget.el = null;
  }
}

export default EmbeddableWidget;
