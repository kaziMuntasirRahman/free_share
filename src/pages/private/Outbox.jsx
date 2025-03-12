import { Link } from "react-router-dom";
import useGetConversation from "../../hooks/useGetConversation";
import { useContext } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import Content from "../shared/Content";

const Outbox = () => {
  const { user } = useContext(FirebaseContext)
  const { conversation, isLoading } = useGetConversation()
  const outbox = conversation?.outbox || [];
  console.log(outbox)
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-around items-center max-w-4xl mb-4 mx-auto">
          <div />
          <h1 className="text-center text-2xl">Your Outbox</h1>
          <Link to='/inbox' className="hover:underline">Inbox</Link>
        </div>
        <table className="table table-zebra max-w-4xl mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th className="text-right">#</th>
              <th className="text-center">To</th>
              <th className="text-center">Subject</th>
              <th>img</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading ?
                // Render a placeholder skeleton when loading
                <>
                  {Array(10).fill(10).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <th>{index + 1}</th>
                      <td className="flex justify-center">
                        <div className="rounded h-4 w-16 skeleton" />
                      </td>
                      <td>
                        <div className="rounded h-4 w-24 skeleton" />
                      </td>
                      <td>
                        <div className="rounded-full h-12 w-12 skeleton" />
                      </td>
                    </tr>
                  ))}
                </>
                :
                // Render actual outbox content when data is loaded
                outbox.map((message, index) => (
                  <tr key={message} className="hover:!bg-gray-300 transition-all duration-200 ease-in-out">

                    {/* The button to open modal */}
                    <th className="text-right">{index + 1}</th>
                    <td className="text-center">{message.isAnonymous ? 'Anonymous' : message.receiver === user?.email ? 'You' : message.sender}</td>
                    <td className="text-center">
                      <label
                        htmlFor="my_modal_7"
                        className="cursor-pointer hover:underline hover:text-black">
                        {message.content?.title}
                      </label>
                    </td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle skeleton h-12 w-12">
                          <label htmlFor="my_modal_7">
                            <img src={message.content?.image} className="cursor-pointer" />
                          </label>
                        </div>
                      </div>
                    </td>
                    {/* Put this part before </body> tag */}
                    < input type="checkbox" id="my_modal_7" className="modal-toggle" />
                    <div className="modal" role="dialog">
                      <div className="modal-box bg-gray-300/0 shadow-none flex items-center justify-center">
                        <div className=" scale-105">
                          <Content content={message.content} />
                        </div>
                      </div>
                      <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                    </div>
                    {/* modal ends */}
                  </tr>
                ))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Outbox;

