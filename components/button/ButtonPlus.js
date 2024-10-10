import Image from "next/image"
import PlusIcon from "../../public/images/plus.svg"

export default function Button(props) {
  return (
    <button type="button" className={`btn btn-danger bg-red btn-read-more ${props.className}`} onClick={props.loadMore}><Image src={PlusIcon} alt="plus icon" width={20} height={20}/> {props.alt}</button>
  )
}