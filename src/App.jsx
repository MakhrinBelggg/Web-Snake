import { useState } from 'react'
import './styles/App.css';

function Textbox(props) {
  <li>
    <p>
      <strong>{props.text1}</strong>{props.text2}
    </p>
  </li>
}

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        
        <Header />

        <main> 
          <section>
            <h3>Наш подход к обучению</h3> 

            <ul>
              <li>
                <p>
                  <strong>Фильтрация информации и технологий</strong> Далее текст поменьше Много текста Из огромного количества информации
                </p>
              </li>
              <Textbox text1="Header22" text2="Microtext"/>
            </ul>
          </section>
        </main>
        
        
      
      </div>
  )
}

export default App

// const user = users.find(user => user.id === 6);
// Результат: { id: 6, login: "Python", username: "Пайтон", password: "py2024", result: 650 }

