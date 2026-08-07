import ServiceForm from "../ServiceForm";

export default function NewServicePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold font-unbounded">Add Service</h1>
            <ServiceForm />
        </div>
    );
}
