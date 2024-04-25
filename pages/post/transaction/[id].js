// pages/transaction/[id].js
import React from 'react';
import { useRouter } from 'next/router';
import UpdateTransaction from '../updateTransaction';

const TransactionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <UpdateTransaction transactionId={id} />;
};

export default TransactionPage;
