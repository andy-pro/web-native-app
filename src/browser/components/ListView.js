import React from 'react';

import { View } from './fela';

class ListView extends React.Component {
  static DataSource = function({
    rowHasChanged,
    sectionHeaderHasChanged,
    getSectionHeaderData,
    getRowData,
  }) {
    // rowHasChanged(prevRowData, nextRowData);
    // sectionHeaderHasChanged(prevSectionData, nextSectionData);
    // getSectionHeaderData(dataBlob, sectionID);
    // getRowData(dataBlob, sectionID, rowID);

    // methods example:
    // rowHasChanged: (r1, r2) => r1 !== r2,
    // sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
    // getSectionHeaderData: (dataBlob, sectionId) => dataBlob[sectionId],
    // getRowData: (dataBlob, sectionId, rowId) => dataBlob[rowId]

    const props = {
      _rowHasChanged: rowHasChanged,
      _sectionHeaderHasChanged: sectionHeaderHasChanged,
      _getSectionHeaderData: getSectionHeaderData,
      _getRowData: getRowData,
    };

    this.cloneWithRows = (_dataBlob, rowIdentities) => ({
      ...props,
      _dataBlob,
      rowIdentities,
      cloneWithRows: this.cloneWithRows,
    });

    this.cloneWithRowsAndSections = (_dataBlob, sectionIdentities, rowIdentities) => ({
      ...props,
      _dataBlob,
      sectionIdentities,
      rowIdentities,
      cloneWithRowsAndSections: this.cloneWithRowsAndSections,
    });

    /*
    _dirtyRows, [[true, true, true ...]
    _dirtySections, [true, true, ...]
    _cachedRowCount,
    rowIdentities,
    sectionIdentities
    */
  };

  render() {
    const {
      contentContainerStyle,
      dataSource,
      renderSectionHeader,
      renderRow,
      renderSeparator,
      enableEmptySections,
    } = this.props;

    let {
      _dataBlob,
      sectionIdentities,
      rowIdentities,
      _getRowData,
      _getSectionHeaderData,
    } = dataSource;

    let sl = _dataBlob.length;

    return (
      <View style={contentContainerStyle}>
        {sectionIdentities
          ? sectionIdentities.map((sid, index) => {
              let sectionData = _getSectionHeaderData(_dataBlob, sid),
                rows = rowIdentities[index],
                rl = rows.length;
              return enableEmptySections || rl
                ? <div key={sid}>
                    {renderSectionHeader(sectionData, sid)}
                    {rows.map((rid, index) => {
                      let rowData = _getRowData(_dataBlob, sid, rid);
                      return (
                        <div key={rid}>
                          {renderRow(rowData, sid, rid)}
                          {index < rl - 1 && renderSeparator(sid, rid)}
                        </div>
                      );
                    })}
                  </div>
                : null;
            })
          : rowIdentities
            ? rowIdentities.map((id, index) => {
                return (
                  <div key={id}>
                    {renderRow(_dataBlob[id], null, id)}
                    {index < sl - 1 && renderSeparator(null, id)}
                  </div>
                );
              })
            : _dataBlob.map((item, index) => {
                let id = item.id || index;
                return (
                  <div key={id}>
                    {renderRow(item, null, id)}
                    {index < sl - 1 && renderSeparator(null, id)}
                  </div>
                );
              })}
      </View>
    );
  }
}

export default ListView;

/*

  <ListView
    contentContainerStyle={styles.wrapper}
    dataSource={ds.cloneWithRows(data)}
    renderRow={renderRow}
    renderSectionHeader={renderSectionHeader}
    enableEmptySections
    initialListSize={Infinity}
  />

*/
