import {
  renderToString,
  renderToStaticMarkup
} from 'react-dom/server'
const Home3 = (param) => {
  return (
    <div
      handle_click='add_count'
    >hey jude {param.count} </div>
  )
}

const status = {
  count:1
}

const addCount = ()=>{
  status.count+=1;
}

const render2String = () => {
  return renderToStaticMarkup(<Home3 count={status.count}></Home3>)
}

export {
  render2String,
  addCount
}