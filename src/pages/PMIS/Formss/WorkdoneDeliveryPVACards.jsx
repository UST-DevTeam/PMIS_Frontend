import { useDispatch, useSelector } from "react-redux"
import Button from "../../../components/Button"
import { backendassetUrl } from "../../../utils/url"
import { useEffect } from "react"
import RepositoryActions from "../../../store/actions/repository-actions"
import { RESET } from "../../../store/reducers/repository-reducer"
import { useSearchParams ,useNavigate} from "react-router-dom"

const CustomerCard = ({ ...item }) => {

    const navigate = useNavigate()
   
    return (
        <Button onClick={() => {
            localStorage.setItem("pvaCustomer", item.customerId);
            let pvaCustomer = localStorage.getItem("pvaCustomer");

            navigate("/forms/PVADeliveryCustomer/MS-PVA?customerId="+pvaCustomer);
          }}  classes={`!w-fit !py-1 px-4`}>
            <img className="m-auto w-[40px] rounded-md hover:border-b-slate-600 border-b-[2px] border-b-slate-700" src={backendassetUrl + item.companyimg} />
            <p className="text-center w-full text-[16px] sm:text-[8px] md:text-[10px] xl:text-[16px] ml-2">{item.customerName}</p>
        </Button>
    )
}


const WorkdoneDeliveryPVACards = () => {
    const [searchParams, _] = useSearchParams()
    const { getCustomers } = useSelector(state => state.repository)
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        dispatch(RepositoryActions.getCustomers(user.uniqueId))
        return () => {
            searchParams.delete("customer")
            searchParams.delete("group")
            dispatch(RESET())
        }
    }, [dispatch])

    return (
        <div className="px-3 pb-10">
            <div className="flex space-x-4 sticky top-0 bg-[#3E454D] pb-3 z-50">
                {
                    Array.isArray(getCustomers) && getCustomers.map(item => <CustomerCard dispatch={dispatch} {...item} />)
                }
            </div>
        </div>
    )
}
export default WorkdoneDeliveryPVACards
