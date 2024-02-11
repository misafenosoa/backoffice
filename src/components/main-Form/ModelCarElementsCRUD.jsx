import CarburantCRUD from "./Carburant"
import CategorieCRUD from "./Categorie"
import { MarqueCRUD } from "./Marques"

export default function CRUDElements(){
  return(
    <div className="row">
      <CarburantCRUD/>
      <CategorieCRUD/>
      <MarqueCRUD/>
  </div>
  )
}