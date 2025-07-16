import EntryListItem from "./EntryListItem";
import BadListItem from "./BadListItem";

export const Table = ({
  entryList,
  badList,
  switchTask,
  handleOnSelect,
  handleOnDelete,
  toDelete,
}) => {
  const entryIds = entryList.map((item) => item._id);
  const badIds = badList.map((item) => item._id);

  return (
    <>
      <div className="row mt-5">
        <div className="col-md">
          <h3 className="text-center">Entry List</h3>
          <hr />
          {/* <!-- Entry list table --> */}
          {entryList.length > 0 && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                value="allEntry"
                id="all-entry"
                onChange={handleOnSelect}
                checked={
                  entryIds.length > 0 &&
                  entryIds.every((id) => toDelete.includes(id))
                }
              />{" "}
              <label htmlFor="">Select All</label>
            </>
          )}
          <table className="table table-striped table-hover border">
            <tbody id="entryList">
              {entryList.map((item, index) => (
                <EntryListItem
                  key={item?._id}
                  item={item}
                  index={index}
                  switchTask={switchTask}
                  onChange={handleOnSelect}
                  toDelete={toDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md">
          <h3 className="text-center">Bad List</h3>
          <hr />
          {/* <!-- Bad list table --> */}
          {badList.length > 0 && (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                value="allBad"
                id="all-bad"
                onChange={handleOnSelect}
                checked={
                  badIds.length > 0 &&
                  badIds.every((id) => toDelete.includes(id))
                }
              />{" "}
              <label htmlFor="">Select All</label>
            </>
          )}
          <table className="table table-striped table-hover border">
            <tbody id="badList">
              {badList.map((item, index) => (
                <BadListItem
                  key={item?._id}
                  item={item}
                  index={index}
                  switchTask={switchTask}
                  onChange={handleOnSelect}
                  toDelete={toDelete}
                />
              ))}
            </tbody>
          </table>
          <div className="alert alert-success">
            You could have saved ={" "}
            <span id="savedHrsElm">
              {badList.length > 0
                ? badList.reduce((acc, i) => acc + i.hr, 0)
                : 0}
            </span>{" "}
            hrs
          </div>
        </div>
      </div>

      {toDelete.length > 0 && (
        <div className="row my-5 d-grid mx-0">
          <button
            onClick={() => handleOnDelete(toDelete)}
            className="btn btn-danger rounded"
          >
            Delete {toDelete.length} Task(s)
          </button>
        </div>
      )}
    </>
  );
};
