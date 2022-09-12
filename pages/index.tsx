import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useRef } from 'react';

type AnyFunction = (...args: any[]) => any;

const DFS = (root: HTMLElement, hook: AnyFunction) => {
  if (root?.children?.length) {
    Array.from(root.children).forEach(e => {
      hook(e)
    })
  }
  hook(root)
}

const getName = (_: string) => {
  return _.match(/handle_(.*)/)?.[1] ?? ''
}

const buildNeo = (_: string, hook: AnyFunction) => {
  const neo = document.createElement('div');
  neo.innerHTML = _;
  DFS(neo, hook);
  return neo
}


const Home2: NextPage = () => {
  const appContainer = useRef<HTMLDivElement>(null)
  const doRender = (method: string) => {
    console.warn('doRender===>', method);
    axios.post('/api/hello', {
      method
    }).then((res) => {
      const { data } = res as { data: { value: string } };
      const neo = buildNeo(data.value, (e: unknown) => {
        if (!(e instanceof HTMLElement)) return
        e.getAttributeNames().forEach(name => {
          const eName = getName(name)
          if (eName) {
            e.addEventListener(eName, () => {
              doRender(e.getAttribute(name) as string)
            })
          }
        })
      })
      const _ = appContainer.current;
      if (!_) throw new Error('container is null for now!!')
      if (_.children.length) {
        _.replaceChild(neo, _.children[0])
      } else {
        _.appendChild(neo);
      }
    })
  }
  return (
    <div>
      Header
      <button onClick={() => { doRender('init') }}>render</button>
      <div id="app_container" ref={appContainer}></div>
    </div>
  )
}


export default Home2
