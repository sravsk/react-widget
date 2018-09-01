import React from 'react';
import ReactDOM from 'react-dom';
import Widget from '../components/Widget.jsx';

class EmbeddableWidget extends React.Component {
  //static property
  static el;

  //es7 static method
  static mount(companyId) {
    //Add google analytics
    let head = document.getElementsByTagName('head')[0];
    let script2 = document.createElement('script');
    script2.setAttribute('async', true);
    script2.setAttribute('defer', true);
    script2.setAttribute('src', "https://www.googletagmanager.com/gtag/js?id=UA-124513548-1");
    head.appendChild(script2);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-124513548-1', {
      'custom_map': {
        'dimension1': 'companyId',
        'dimension2': 'articleId',
        'dimension3': 'categoryId',
      },
      'page_title': 'homepage',
      'page_location': document.location.href,
      'page_path': '/'
    });

    const component = <Widget companyId={companyId} gtag={gtag}/>;

    function doRender() {
      if (EmbeddableWidget.el) {
        throw new Error('EmbeddableWidget is already mounted, unmount first');
      }

      //using hashid module in browser by appending hashid.min.js to the knowhow-widget div element
      const el = document.createElement('div');
      el.setAttribute('class', 'knowhow-widget');
      const hashid = document.createElement('script');
      hashid.setAttribute('src','https://s3-us-west-1.amazonaws.com/knowhow-s3/hashids.min.js');
      el.appendChild(hashid)
      document.body.appendChild(el);
      ReactDOM.render(
        component,
        el
      );
      EmbeddableWidget.el = el;
    }

    //check if load event is about to fire.
    if (document.readyState === 'complete') {
      // gapi.load('auth2', start);
      doRender();
    } else {
      window.addEventListener('load', () => {
        // gapi.loadLib('auth2', start);
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

