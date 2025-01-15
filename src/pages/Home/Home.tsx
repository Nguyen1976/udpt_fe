import Menu from '~/components/Menu';
import TextEditor from '~/components/TextEditor';

export default function Home() {
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
