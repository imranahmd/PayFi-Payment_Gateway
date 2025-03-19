package com.payfi.transaction.responsedto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MessageResponseDto {

    private String code;
    private String desc;
    private String reqId;
    private String time;
    private List<String> partMessageIds;
    private int totalMessageParts;
    private String campaignName;

}

