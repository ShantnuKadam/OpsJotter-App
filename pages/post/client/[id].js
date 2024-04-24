import { useRouter } from 'next/router';
import UpdateClient from '../updateClient'; // Your component that shows client details

const ClientPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return <UpdateClient clientId={id} />;
};

export default ClientPage;
