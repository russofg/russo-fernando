import {useEffect, useState} from 'react';
//import GetFetchList from '../../services/GetFetchList';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import { getFirestore } from '../../services/getFirestore';

const ItemDetailContainer = () => {
   

    const [charla, setCharla] = useState([])
    const [loading, setLoading] = useState(true);
   

    const { detalleId } = useParams();

    useEffect(() => {
        setTimeout(()=>{

            // GetFetchList
            // .then(response => {        
            //     setCharla(response.find(prod => prod.id === detalleId))
            // })
            const dataBase = getFirestore()

            const dataBaseQuery = dataBase.collection("items").doc(detalleId).get()
    
            dataBaseQuery
            .then(item => setCharla({id:item.id, ...item.data()}))

        .catch (error => alert("Error ", error))
        .finally(()=> setLoading(false))
        }, 1000 )},[detalleId])   

    return (
            <div className="detail-container">
                <h2 className ="detail-titulo">Detalle de las Charlas</h2>
                {loading ? <Spinner className='mt-5' animation="border" variant="primary" /> : <ItemDetail charla={charla} />}
            </div>

                
            
    )
}

export default ItemDetailContainer