"use client";

import { TransactionTable } from "@/components/dashboard/transactionsHistory";
import { TRANSACTIONS } from "@/context/transactionsData";
import React, { useState } from "react";

// Transaction history states

function page() {
	const [transactions, setTransactions] = useState(TRANSACTIONS);

	return (
		<div>
			<TransactionTable transactions={transactions} />
		</div>
	);
}

export default page;
