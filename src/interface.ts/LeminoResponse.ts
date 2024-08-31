
export type LeminoResponse = {
  result: string
  parent_list: Array<ParentResource>
}

export interface ParentResource extends ChildResource {
  child_list: Array<ChildResource>
}

export interface ChildResource {
  crid: string
  pit_git_type: 'WIZARD' | 'SERIES' | 'PIT'
  entry_date: string
  update_date: string
  title: string
  title_ruby_list: Array<string>
  title_sub: string
  title_prefix_list: Array<any>
  image_list: {
    height: {
      all_image: number
      credit: string
      image_list_obj: Array<{
        url: string
        order: number
        image_meta_list: any
      }>
    }
    width: {
      all_image: number
      credit: string
      image_list_obj: Array<{
        url: string
        order: number
        image_meta_list: any
      }>
    }
  }
  synopsis_info: {
    synopsis: string
    prefix: any
  }
  genre_list: {
    vod: Array<{
      id: string
      dist_start: string
      dist_end: string
    }>
    kids: any
  }
  duration_sec: any
  search: number
  adult: number
  view_ng_control_obj: {
    dl: number
    dl_hd: number
    review_rating: number
    recommend: number
  }
  cid_obj: any
  qfhd_flg: number
  hdr_flg: number
  target_age: string
  role_obj: Array<{
    role_name: string
    role_detail: string
    role_ruby: string
    role_order: number
  }>
  license_list: Array<any>
  license_icon_flg: number
  constitution: string
  member_of: Array<string>
  bonus_flg: number
  overlooked_flg: number
  cp_abbreviation: string
  cp_name: string
  duration: any
  content_type_list: Array<string>
  emergency_sell_end_flg: number
  emergency_dist_end_flg: number
  intro_outro_list: any
  avail_status: number
  sns_share_obj: any
  icon_obj: {
    icon_type: string
    icon_start: string
    icon_end: string
  }
  sockets_cooperation_flg: number
  previous_content?: string
  next_content?: string
  live_type: any
  display_type: any
  service_category: any
  constitution_url: any
  user_emotion: any
  time_line_emotion: any
  sell_ch: any
  burner_list_obj: any
  coupon: any
  view_discount: any
  svod_user_discount: any
  goto_flg: any
  external_sell_url: any
  warning_performance: string
  related_ppv: Array<any>
  related_vod: Array<any>
  referral_url: string
  overlooked_vod: number
  bonus_vod: number
  live_delivery_type: number
  live_delivery_icon: number
  live_chat: number
  content_num: number
  play_button_name: string
  total_contents_count: string
  total_play_time: string
  tv_flg: number
  tv_obj: any
  child_license_list: Array<{
    crid: string
    license_list: Array<{
      license_id: string
      valid_start_date: string
      valid_end_date: string
      sale_start_date: string
      sale_end_date: string
      sale_type: string
    }>
  }>
  regular_icon_obj: {
    regular_icon: string
    regular_icon_start: string
    regular_icon_end: string
  }
  auto_play: number
  use_delivery_end_image: number
  recommend_coefficient: number
  series_abbreviation: string
  sensitive_flg: number
  title_original: string
  trailer_info_obj: any
  highlight_info_obj: any
  keyword_list: Array<string>
  display_start: string
  display_end: string
  new_arrival_start: string
  new_arrival_end: string
  est_play_send: any
  live_open_date: any
  live_close_date: any
  live_start_date: any
  live_end_date: any
  live_notification_list: any
  live_performance_start: any
  live_performance_end: any
  live_open_ng_flg: number
  dolby: number
  music_content: number
  free_icon: number
  new_ep_list: Array<{
    new_ep_start: string
    new_ep_end: string
  }>
  availability_start: string
  availability_end: string
  self_license_list: Array<any>
  main_story_preview_flg: number
  main_story_preview_obj: {
    crid: string
    cid: string
    main_story_start_play: string
    license_list: Array<{
      license_id: string
      sale_type: string
      valid_start_date: string
      valid_end_date: string
    }>
  }
  country: Array<string>
  year: string
  subtitle_dubbing_icon: any
  charge_icon: Array<any>
  live_start_date_list: any
  series_parent: any
  startover_flg: any
  avodmidroll_flg: number
  additional_meta: {
    update_date: string
    hourly_play_count: number
    daily_play_count: number
    top10_icon_flg: number
    favorite_count: number
    average_rating: number
    review_count: number
    top_emotional_stamps: Array<string>
    emotional_stamp_count_1: number
    emotional_stamp_rate_1: number
    emotional_stamp_count_2: number
    emotional_stamp_rate_2: number
    emotional_stamp_count_3: number
    emotional_stamp_rate_3: number
    emotional_stamp_count_4: number
    emotional_stamp_rate_4: number
    emotional_stamp_count_5: number
    emotional_stamp_rate_5: number
    emotional_stamp_count_6: number
    emotional_stamp_rate_6: number
    emotional_stamp_count_7: number
    emotional_stamp_rate_7: number
    emotional_stamp_count_8: number
    emotional_stamp_rate_8: number
    emotional_stamp_count_9: number
    emotional_stamp_rate_9: number
    emotional_stamp_count_10: number
    emotional_stamp_rate_10: number
    emotional_stamp_count_11: number
    emotional_stamp_rate_11: number
    emotional_stamp_count_12: number
    emotional_stamp_rate_12: number
    emotional_stamp_count_13: number
    emotional_stamp_rate_13: number
    emotional_stamp_count_14: number
    emotional_stamp_rate_14: number
    emotional_stamp_count_15: number
    emotional_stamp_rate_15: number
    emotional_stamp_count_16: number
    emotional_stamp_rate_16: number
    emotional_stamp_count_17: number
    emotional_stamp_rate_17: number
    emotional_stamp_count_18: number
    emotional_stamp_rate_18: number
    emotional_stamp_count_19: number
    emotional_stamp_rate_19: number
    emotional_stamp_count_20: number
    emotional_stamp_rate_20: number
  }
}
