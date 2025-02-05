import Menu from '~/components/Menu';
import TextEditor from '~/components/TextEditor';
import { useDispatch } from 'react-redux';
import { updateUser } from '~/redux/userSlice';
import { useEffect } from 'react';
import { getDetailUser } from '~/services/UserService';

export default function Home() {
    const dispatch = useDispatch();
    const fetchUser = async () => {
        const id = await JSON.parse(localStorage.getItem('id') ?? 'null');
        try {
            if (id) {
                const response = await getDetailUser(id);
                if (response.user) {
                    const { id, name, email } = response.user;
                    dispatch(updateUser({ id, name, email }));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="px-10 grid grid-cols-12">
            <div className="col-span-3">
                <Menu />
            </div>
            <div className="col-span-8">
                <TextEditor />
            </div>
        </div>
    );
}
