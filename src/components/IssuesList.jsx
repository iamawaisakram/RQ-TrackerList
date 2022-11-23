import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList() {
    const issuesQuery = useQuery(["issues"], () =>
        fetch("/api/issues").then((res) => res.json())
    );

    console.log(issuesQuery.data);

    return (
        <div>
            <h1>Issues List</h1>
            {issuesQuery.isLoading ? (
                <p>Loading ...</p>
            ) : (
                issuesQuery.data.map((issue) => (
                    <ul className="issues-list" key={issue.id}>
                        <IssueItem
                            title={issue.title}
                            number={issue.number}
                            assignee={issue.assignee}
                            commentCount={issue.comments.length}
                            createdDate={issue.createdDate}
                            createdBy={issue.createdBy}
                            labels={issue.labels}
                            status={issue.status}
                        />
                    </ul>
                ))
            )}
        </div>
    );
}
