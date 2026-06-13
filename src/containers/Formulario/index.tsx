import { useDispatch } from 'react-redux'
import { FormEvent, useState } from 'react'

import { Form, Opcao, Opcoes } from './styles'
import { MainContainer, Titulo, Campo, BotaoSalvar } from '../../styles'
import * as enums from '../../utils/enums/Tarefa'

import { cadastrar } from '../../store/reducers/tarefa'
import { useNavigate } from 'react-router-dom'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)

  const cadastrarTarefa = (e: FormEvent) => {
    e.preventDefault()

    dispatch(
      cadastrar({
        titulo,
        prioridade,
        status: enums.Status.PENDENTE,
        descricao
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Titulo>Nova tarefa</Titulo>

      <Form onSubmit={cadastrarTarefa}>
        <Campo
          value={titulo}
          type="text"
          placeholder="Título"
          onChange={(e) => setTitulo(e.target.value)}
        />
        <Campo
          value={descricao}
          as="textarea"
          placeholder="Descrição da tarefa"
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Opcoes>
          <p>Prioridade</p>
          {Object.values(enums.Prioridade).map((prioridade) => (
            <Opcao key={prioridade}>
              <input
                value={prioridade}
                name="prioridade"
                defaultChecked={prioridade === enums.Prioridade.NORMAL}
                type="radio"
                onChange={(e) =>
                  setPrioridade(e.target.value as enums.Prioridade)
                }
                id={prioridade}
              />{' '}
              <label htmlFor={prioridade}>{prioridade}</label>
            </Opcao>
          ))}
        </Opcoes>
        <BotaoSalvar type="submit">Cadastrar</BotaoSalvar>
      </Form>
    </MainContainer>
  )
}

export default Formulario
