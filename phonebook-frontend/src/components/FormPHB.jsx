import { useState } from "react";

//states = [estado do nome, estado do número]
//funcs = [onSubmit, mudança do nome, mudança do número]
const FormPhB = ({states, funcs}) => {
  return (
    <>
      <form onSubmit={funcs[0]}>
        <div>
          name: <input  value={states[0]} onChange={funcs[1]}/>
          <br/>
          number: <input value={states[1]} onChange={funcs[2]}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}


export default FormPhB