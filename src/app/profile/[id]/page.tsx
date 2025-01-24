export default async function UserProfile({params}:any) {

    const { id } = await params
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
            <h1 className="text-4xl font-bold text-white">Profile page <span className="p-2 rounded bg-orange-600 text-black">{id}</span></h1>
            <hr />
        </div>
    );
}