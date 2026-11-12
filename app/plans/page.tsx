"use client"

import { useEffect, useState } from "react"

type PlanDTO = {
    id: string;
    title: string;
    description: string;
    price_in_cents: number;
};

type Plan = {
  id: string;
  title: string;
  description: string;
  priceInCents: number;
};

type PlansResponse = {
  plans: Plan[];
};

export default function Plan(){
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)

  const fetchPlans = async () => {
    const response = await fetch("http://localhost:8000/subscription-plan")

    if (!response.ok) {
      return
    }

    const data: PlanDTO[] = await response.json()

    setPlans(data.map(p => ({
        id: p.id,
        description: p.description,
        priceInCents: p.price_in_cents,
        title: p.title
    })))
  }

  const onPreviousPage = () => {
    if (currentPage-1 <= 0) return;
    setCurrentPage(page => page-1)
  }

  const onNextPage = () => {
    if (currentPage+1 > 10) return;
    setCurrentPage(page => page+1)
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  return (
    <>
      <h1>Plan</h1>
      <List 
        plans={plans} 
        page={{
            currentPage: currentPage,
            totalPages: 10,
            onNextPage: onNextPage,
            onPreviousPage: onPreviousPage
        }}
      />
    </>
  )
}

interface ListPaginationProp {
    currentPage: number
    totalPages: number
    onPreviousPage: ()=>void
    onNextPage: ()=>void
}

function List({plans, page}: {plans: Plan[], page: ListPaginationProp}){
    return (
        <div>
            <input/>
            {plans.map(p => <Tile plan={p}/>)}
            <PageSelector currentPage={page.currentPage} totalPages={page.totalPages} onPrev={page.onPreviousPage} onNext={page.onNextPage}/>
        </div>
    )
}

function PageSelector({currentPage, onPrev, onNext}: {currentPage: number, totalPages: number, onPrev: ()=>void, onNext: ()=>void}){
    return (
        <>
            <button onClick={onPrev}>{"<"}</button>
            <button>{currentPage}</button>
            <button onClick={onNext}>{">"}</button>
        </>
    )
}

function Tile({plan}: {plan: Plan}){
    const formatPricing = (priceInCents: number) => {
        const cents = priceInCents%100
        const whole = (priceInCents - cents)/100

        return `R$${whole},${cents}`
    }

    return (
        <div className="flex flex-row">
            <div className="flex flex-col">
                <span>{plan.title}</span>
                <span>{plan.description}</span>
            </div>
            <span>{formatPricing(plan.priceInCents)}</span>
        </div>
    )
}