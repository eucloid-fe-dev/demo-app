import { Table } from 'react-bootstrap';
import { useCanvasContext } from '../canvas/context/context';
import { Settings } from 'react-feather';

import './data-holder.scss';
import { IRect } from '../canvas/context/contextType';

function DataHolder(props: any) {
  const { data } = useCanvasContext();
  const openSettings = (item: IRect) => {
    props.showContextMenu(item.id);
  };
  return (
    <>
      {data.rects && data.rects.filter((x) => x.label !== -1).length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Label</th>
              <th>Predicted Value</th>
            </tr>
          </thead>
          <tbody>
            {data.rects &&
              data.rects
                .filter((x) => x.label !== -1)
                .map((x: any) => {
                  return (
                    <tr key={x.id}>
                      <td
                        style={{
                          backgroundColor:
                            data?.labels?.find((l) => x.label === l.id)?.color +
                            '19',
                        }}
                      >
                        {data?.labels?.find((l) => x.label === l.id)?.text}
                      </td>
                      <td>
                        <div className="text-container">
                          <div>{x.text}</div>
                          <small
                            className="pointer"
                            onClick={() => openSettings(x)}
                          >
                            <Settings className="icon" />
                          </small>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      )}
      {data.rects.filter((x) => x.label !== -1).length === 0 && (
        <div className="message small">
          Please start identifying labels by drawing over the document.
        </div>
      )}
    </>
  );
}

export default DataHolder;