import React from 'react';
import { Flex, Divider } from '@chakra-ui/react';
import FeedHeaderMenu from 'components/Feeds/FeedHeaderMenu';
import { PostFilterParamType, PostSortByEnum } from 'Schema/Schema';

type FeedHeaderProps = {
  isMobileView: boolean;
  onChangeSortBy?: (sortBy: PostSortByEnum) => void;
  onSubmitFilter: (filter: PostFilterParamType) => void;
  defaultSortByValue: PostSortByEnum;
};

export const FeedHeader: React.FC<FeedHeaderProps> = (props) => {
  const { onSubmitFilter, onChangeSortBy, defaultSortByValue, isMobileView } =
    props;
  return (
    <Flex align="center" justify="space-between" py={5} pb={0}>
      <Flex grow={1}>
        <Divider orientation="horizontal" borderColor="icon.400" />
      </Flex>
      <FeedHeaderMenu
        isMobileView={isMobileView}
        onChangeSortBy={onChangeSortBy}
        defaultSortByValue={defaultSortByValue}
        onSubmitFilter={onSubmitFilter}
      />
    </Flex>
  );
};
