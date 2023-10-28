// in this component, we are pre-rendering all our feedback (instances on test table in prisma) using getStaticProps()
// achieves the same code with the GET fetch in the pages/index.js file, but now with pre-rendering

// impor this helper function that extracts the GET request feedback data from the API route
import { getAllTestInstances } from "../api/feedback"
import { useState } from "react"

// this function props in the GET request data from /api/feedbackId  <---------- dynamic file name in the api folder used here
function FeedbackPage(props) {
    const [feedbackData, setFeedbackData] = useState()

    // function for navigating to a specific feedbackId page
    function loadFeedbackHandler(id) {
        fetch(`/api/${id}`)
        .then(response => response.json())
        .then(data => setFeedbackData(data))
    }

    return (
        <>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map(item =>
                <li key={item.id}>
                    {item.text}
                    {/* alternative way instead of arrow function for onclick () => ... could use a context bind as well  -->   button onClick={loadFeedbackHandler.bind(null, item.id)} */}
                    <button onClick={() => loadFeedbackHandler(item.id)}>Show Details</button>
                </li>)}
            </ul>
        </>
    )
}

// getStaticProps() reads our server side API code, extracts the data we need, and passes it on the component so that it can be pre-rendered
export async function getStaticProps() {
    const data = await getAllTestInstances()
    return {
        props: {
            feedbackItems: data
        }
    }
}

export default FeedbackPage
