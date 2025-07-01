import { useDispatch, useSelector } from "react-redux"
import Button from "../../../components/Button"
import { backendassetUrl } from "../../../utils/url"
import { useEffect } from "react"
import RepositoryActions from "../../../store/actions/repository-actions"
import { RESET } from "../../../store/reducers/repository-reducer"
import { Link, useSearchParams } from "react-router-dom"

const CustomerCard = ({ dispatch, ...item }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    function getProjectGroup() {
        setSearchParams({ customer: item.customerName })
        dispatch(RepositoryActions.getProjectGroups(item.customerId))
    }
    return (
        <Button classes={`!w-fit !py-1 px-3 ${searchParams.get("customer") === item.customerName ? "bg-yellow-400 text-[#3E454D]" : ""}`} onClick={getProjectGroup}>
            <img className="m-auto w-[40px] rounded-md hover:border-b-slate-600 border-b-[2px] border-b-slate-700" src={backendassetUrl + item.companyimg} />
            <p className="text-center w-full text-[16px] sm:text-[8px] md:text-[10px] xl:text-[16px] ml-2">{item.customerName}</p>
        </Button>
    )
}

const ProjectIdCard = ({ dispatch, ...item }) => {
    const [searchParams, _] = useSearchParams()
    return (
        <div className="flex items-center">
            <div className={`w-12 h-12 relative bottom-6 border-l-2 border-b-2 border-white`} />
            <Link to={`/repository/${searchParams.get("customer")}/${searchParams.get("group")}/${item.projectId}/${item.uniqueId}`}>
                <Button classes="w-[260px] !py-2 px-4">
                    <p className="text-center w-full text-[16px] sm:text-[8px] md:text-[10px] xl:text-[16px] ml-2">{item.projectId}</p>
                </Button>
            </Link>
        </div>
    )
}

const ProjectGroupCard = ({ dispatch, ...item }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { getProjectIds } = useSelector(state => state.repository)
    function getProjectGroup() {
        setSearchParams({ customer: searchParams.get("customer"), group: item.projectGroup })
        dispatch(RepositoryActions.getProjectIds(item.uniqueId))
    }
    const active = searchParams.get("group") === item.projectGroup && Array.isArray(getProjectIds)

    useEffect(() => {
        return () => {
            searchParams.delete("customer")
            searchParams.delete("group")
        }
    }, [])
    return (
        <div className="flex relative w-fit">
            <div className="flex items-center">
                <Button classes={`w-[220px] !py-2 px-4 ${active ? "bg-yellow-400 text-[#3E454D]" : ""}`} onClick={getProjectGroup}>
                    <p className="text-center w-full text-[16px] sm:text-[8px] md:text-[10px] xl:text-[16px] ml-2">{item.projectGroup}</p>
                </Button>
                {
                    active && <div className="w-12 bg-white h-[1px]" />
                }
            </div>
            {
                active && (
                    <div className="flex flex-col justify-center absolute left-[267px] top-[110%] pb-8">
                        {
                            getProjectIds.map(item => <ProjectIdCard {...item} />)
                        }
                    </div>
                )
            }
        </div>
    )
}

const RepositoryCustomerCard = () => {
    const [searchParams, _] = useSearchParams()
    const { getCustomers, getProjectGroups } = useSelector(state => state.repository)
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
            <div className="mt-6 flex-1 flex flex-col space-y-4 justify-center">
                {
                    searchParams.get("customer") && Array.isArray(getProjectGroups) && getProjectGroups.map(item => <ProjectGroupCard dispatch={dispatch} {...item} />)
                }
            </div>
        </div>
    )
}
export default RepositoryCustomerCard