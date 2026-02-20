export default function Error({ message }: { message: string }) {
  return <p className="w-full text-right text-red-500">{message}</p>;
}
