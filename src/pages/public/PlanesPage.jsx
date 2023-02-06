import Encabezado from '../../components/Encabezado'
import Plan1 from '../../components/planes/Plan1'
import Plan2 from '../../components/planes/Plan2'
import Plan3 from '../../components/planes/Plan3'
import Plan4 from '../../components/planes/Plan4'

const PlanesPage = () => {
  return (
    <>
      <Encabezado titulo={'Planes'} descripcion={'Elige el plan que más se adapte a tus necesidades'} />

      <div className='contenedor-planes'>
        <Plan1 />

        <Plan2 />

        <Plan3 />

        <Plan4 />
      </div>
    </>
  )
}

export default PlanesPage
