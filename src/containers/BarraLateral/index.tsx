import { useDispatch, useSelector } from 'react-redux'
import FiltroCard from '../../components/FiltroCard'
import * as S from './styles'
import { Botao, Campo } from '../../styles'

import { alteraTermo } from '../../store/reducers/filtro'
import { RootReducer } from '../../store'

import * as enums from '../../utils/enums/Tarefa'
import { useNavigate } from 'react-router-dom'

type Props = {
  mostrarFiltros: boolean
}

const BarraLateral = ({ mostrarFiltros }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  return (
    <S.Aside>
      <div>
        {mostrarFiltros ? (
          <>
            <Campo
              type="text"
              value={termo}
              placeholder="Buscar"
              onChange={(e) => {
                dispatch(alteraTermo(e.target.value))
              }}
            />
            <S.Filtros>
              <FiltroCard
                valor={enums.Status.PENDENTE}
                criterio="status"
                legenda="Pendentes"
              />
              <FiltroCard
                valor={enums.Status.CONCLUIDA}
                criterio="status"
                legenda="Concluídas"
              />
              <FiltroCard
                valor={enums.Prioridade.URGENTE}
                criterio="prioridade"
                legenda="Urgentes"
              />
              <FiltroCard
                valor={enums.Prioridade.IMPORTANTE}
                criterio="prioridade"
                legenda="Importantes"
              />
              <FiltroCard
                valor={enums.Prioridade.NORMAL}
                criterio="prioridade"
                legenda="Normal"
              />
              <FiltroCard criterio="todas" legenda="Todas" />
            </S.Filtros>
          </>
        ) : (
          <Botao onClick={() => navigate('/')}>Voltar à lista de tarefas</Botao>
        )}
      </div>
    </S.Aside>
  )
}

export default BarraLateral
